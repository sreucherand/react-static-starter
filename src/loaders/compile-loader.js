const NodeTemplatePlugin = require('webpack/lib/node/NodeTemplatePlugin');
const NodeTargetPlugin = require('webpack/lib/node/NodeTargetPlugin');
const LibraryTemplatePlugin = require('webpack/lib/LibraryTemplatePlugin');
const SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin');
const LimitChunkCountPlugin = require('webpack/lib/optimize/LimitChunkCountPlugin');

module.exports = function(source) {
  if (this.cacheable) {
    this.cacheable();
  }

  return source;
};

module.exports.pitch = function(request) {
  if (this.cacheable) {
    this.cacheable();
  }

  const cache = 'subcache ' + __dirname + ' ' + request;
  const callback = this.async();
  const childFilename = 'compile-output-filename';
  const loader = this;

  let source = null;

  const options = {
    filename: childFilename,
  };

  const compilation = (function(loader) {
    let compiler = loader._compiler;
    let compilation = loader._compilation;

    while (compiler.parentCompilation) {
      compilation = compiler.parentCompilation;
      compiler = compilation.compiler;
    }

    return compilation;
  })(loader);

  const compiler = compilation.createChildCompiler('compile-compiler', options);

  compiler.apply(new NodeTemplatePlugin(options));
  compiler.apply(new LibraryTemplatePlugin(null, 'commonjs2'));
  compiler.apply(new NodeTargetPlugin());
  compiler.apply(new SingleEntryPlugin(loader.context, '!!' + request));
  compiler.apply(new LimitChunkCountPlugin({ maxChunks: 1 }));

  compiler.plugin('compilation', function(compilation) {
    if (compilation.cache) {
      if (!compilation.cache[cache]) {
        compilation.cache[cache] = {};
      }

      compilation.cache = compilation.cache[cache];
    }
  });

  compiler.plugin('after-compile', function(compilation, callback) {
    source =
      compilation.assets[childFilename] &&
      compilation.assets[childFilename].source();

    compilation.chunks.forEach(function(chunk) {
      chunk.files.forEach(function(file) {
        delete compilation.assets[file];
      });
    });

    callback();
  });

  compiler.runAsChild(function(error, entries, compilation) {
    if (error) {
      callback(error, null);
    }

    if (compilation.errors.length > 0) {
      return callback(compilation.errors[0]);
    }

    if (!source) {
      return callback(new Error('Child compiler did not produce any content.'));
    }

    compilation.fileDependencies.forEach(function(dependency) {
      loader.addDependency(dependency);
    }, loader);

    compilation.contextDependencies.forEach(function(dependency) {
      loader.addContextDependency(dependency);
    }, loader);

    try {
      const exports = loader.exec(source, request);

      if (typeof exports.default !== 'string') {
        callback(new Error('Exported value is not a string.'));
      }

      callback(null, exports.default);
    } catch (e) {
      callback(e);
    }
  });
};
