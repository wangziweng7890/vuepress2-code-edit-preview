import { createPage } from '@vuepress/core'
import type MarkdownIt from 'markdown-it'
import { mdPlugin } from './plugins/plugins'
import { MarkdownTransform } from './plugins/markdown-transform'
import { HotUpdate } from './plugins/hot-update'
import fs from 'fs'
import path from 'path'
export default function preview2edit() {
    return {
        name: 'test1',
        multiple: false,
        alias: {
            '@docs': path.resolve('', 'docs'),
        },
        extendsMarkdown: async (md: MarkdownIt, app) => {
            mdPlugin(md, app)
        },
        onInitialized: async (app) => {
            if (!app.env.isDev) {
                return;
            }
            await Promise.all([
                app.writeTemp('CodeEdit.vue', fs.readFileSync(path.resolve(__dirname, './CodeEdit.vue'))),
                app.writeTemp('Demo.vue', fs.readFileSync(path.resolve(__dirname, './Demo.vue'))),
                app.writeTemp('tempCode.vue', ''),
            ])

            const editPage = await createPage(app, {
                path: '/gedit.html',
                filePath: path.resolve(__dirname, '../../demo/gedit.md')
                // filePath: path.resolve(__dirname, './gedit.md')
            })
            app.pages.push(editPage)
            const previewPage = await createPage(app, {
                path: '/gpreview.html',
                filePath: path.resolve(__dirname, '../../demo/gpreview.md')
                // filePath: path.resolve(__dirname, './gpreview.md')
            })
            app.pages.push(previewPage)
        },
        extendsBundlerOptions: async (bundlerOptions, app) => {
            // 生产模式没有node服务
            if (app.env.isDev) {
                bundlerOptions.viteOptions.plugins.push(MarkdownTransform(app))
                bundlerOptions.viteOptions.plugins.push(HotUpdate(app))
            }
        }
    }
}