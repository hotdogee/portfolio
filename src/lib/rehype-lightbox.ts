import { visit } from 'unist-util-visit'

export default function rehypeLightbox() {
  return function (tree) {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'img') {
        if (!node.properties) {
          node.properties = {}
        }
        node.properties.lightbox = true
      }
      if (node.tagName === 'figure') {
        if (!node.properties) {
          node.properties = {}
        }
        node.properties.className = ['flex', 'flex-col', 'items-center', 'justify-center']
      }
    })
  }
}
