import TextBlock from "./components/TextBlock"
import MediaBlock from "./components/MediaBlock"
import scss from "./Chapter.module.scss"

const Chapter = ({ chapter }) => {
  return (
    <div className={scss.chapter}>
      {chapter.page_blocks.map((block, index) => {
        return (
          <div key={`page-blocks-${index}`}>
            {block.layout == "text" &&
              <TextBlock data={block} />
            }
            {block.layout == "media" &&
              <MediaBlock data={block}/>
            }
          </div>
        )
      })}
    </div>
  )
}

export default Chapter