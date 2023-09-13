<template>
  <div id="richTextEditor" :style="{ height: height + 'px' }"> </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue'
  import Quill from 'quill'
  import 'quill/dist/quill.snow.css'
  export default defineComponent({
    name: 'RichTextEditor',
    props: {
      height: {
        type: [Number, String],
        default: 'auto',
      },
    },
    setup() {
      let quill: Quill | null = null
      const init = () => {
        const options = {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'], // Switch button
              ['blockquote', 'code-block'],

              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ script: 'sub' }, { script: 'super' }], // Bidding/down bidding
              [{ indent: '-1' }, { indent: '+1' }], // Reduce indentation/indentation
              [{ direction: 'rtl' }], // Text line

              [{ size: ['small', false, 'large', 'huge'] }], // User customs pull down
              [{ header: [1, 2, 3, 4, 5, 6, false] }],

              [{ color: [] }, { background: [] }], // The theme is dropped by default, and the value provided by the theme
              [{ align: [] }],

              ['link', 'image'],

              ['clean'], // Clearance
            ],
          },
          placeholder: 'Please enter the article content ...',
          theme: 'snow',
        }
        quill = new Quill(document.getElementById('richTextEditor') as Element, options)
      }
      onMounted(init)
      const getHtmlContent = () => {
        return (document.getElementById('richTextEditor')?.firstChild as any).innerHTML
      }
      const getJsonContent = () => {
        return JSON.stringify(quill?.getContents())
      }

      const setContents = (content: any) => {
        quill?.setContents(content)
      }
      return {
        getHtmlContent,
        getJsonContent,
        setContents,
      }
    },
  })
</script>
