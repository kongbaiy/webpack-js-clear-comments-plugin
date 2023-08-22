const JSClearCommentsEventName = 'JSClearCommentsPlugin';
const JSCommentsRegexp = /\/\/.+\n?|\/\*[^\/]*\*\/\n?/g;

class JSClearCommentsPlugin {
    apply(compiler) {
        compiler.hooks.emit.tap(JSClearCommentsEventName, (compilation) => {
            for (const name in compilation.assets) {
                if (name.endsWith('js')) {
                    const contents = compilation.assets[name].source();
                    const newContents = contents.replace(JSCommentsRegexp, '');

                    compilation.assets[name] = {
                        source: () => newContents,
                        size: () => newContents.length
                    }
                }
            }
        });
    }
}

module.exports = JSClearCommentsPlugin