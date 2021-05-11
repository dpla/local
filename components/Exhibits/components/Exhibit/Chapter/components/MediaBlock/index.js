import parse from 'html-react-parser';
import scss from "./MediaBlock.module.scss"
import {Card, Container} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

const MediaBlock = (attachment) => {
    return (
        <Container maxWidth={"md"}>
            <Card>
                <CardMedia className={scss.cardImage} image={attachment.data[0].files[0].file_urls.original}/>
                <CardContent>
                    <caption className={scss.caption}> {attachment.data[0].caption && parse(attachment.data[0].caption)}</caption>
                </CardContent>
            </Card>
        </Container>
    )
}


export default MediaBlock