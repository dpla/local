import TextBlock from "./components/TextBlock"
import MediaBlock from "./components/MediaBlock"
import scss from "./Chapter.module.scss"

const Chapter = ({ chapter }) => {
  return (
    <div className={scss.chapter}>
      {chapter.blocks.map((block, index) => {
        return (
          <div key={`page-blocks-${index}`}>
            {block.item.layout == "text" &&
              <TextBlock data={block.item} />
            }
            {block.item.layout == "media" &&
              <MediaBlock data={block.item}/>
            }
          </div>
        )
      })}
    </div>
  )
}

export default Chapter