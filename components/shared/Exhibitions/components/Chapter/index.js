import css from "./Chapter.module.scss"
import ChapterTitle from "./components/ChapterTitle"

const Chapter = ({ chapter, index }) => {
  return (
    <>
      <ChapterTitle
        chapter={`Chapter ${index + 1}`}
        title={chapter.title}
        image="https://via.placeholder.com/350"
        imageAlt="#"
        key={`chapter-${index + 1}`} />

      {chapter.page_blocks.map((block, index) => {
        return (
          <>
            {block.layout == "text" &&
              <p>text</p>
            }
            {block.layout == "media" &&
              <p>media</p>
            }
          </>
        )
      })}
    </>
  )
}

export default Chapter