import css from "./Chapter.module.scss"
import ChapterTitle from "./components/ChapterTitle"
import TextBlock from "./components/TextBlock"
import MediaBlock from "./components/MediaBlock"

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
              <TextBlock data={block} />
            }
            {block.layout == "media" &&
              <MediaBlock data={block}/>
            }
          </>
        )
      })}
    </>
  )
}

export default Chapter