import { useEffect, useState } from 'react';
import classes from './Post.module.css';

export default function Post(props) {

    let description = props.description;
    let shortcattedDescription;
    const [imgSrc, setImgSrc] = useState(null);
    if (description.length > 200) {
        shortcattedDescription = description.slice(0, 199).split('');
        for (let i = 197; i < 200; i++) {
            shortcattedDescription[i] = '.';
        }
        shortcattedDescription.join('');
    }
    function deletePost() {
        const postId = props.id;
        fetch('http://back.ru/delete.php', {
            method: "POST",
            body: postId,
        })
            .then(() => {
                // const newData = props.data
                //     .filter((post) => post.id !== postId)
                // props.changeData(newData);
                props.deletePostFn(postId);
            })
    }
    useEffect(() => {
        if (props.img_src) {
            const reqUrl = `http://back.ru/${props.img_src}`;
            fetch(reqUrl, {
                mode: 'no-cors',
            })
                .then(() => {
                    setImgSrc(reqUrl);
                })
        }
    }, [])
    return (
        <div className={classes.post}>
            <div className={classes.header}>
                <h4>
                    {props.category}
                </h4>
                <h4>
                    {props.region}
                </h4>
                <h4 className={classes.vip_label}>
                    {props.vip ? 'VIP' : ' '}
                </h4>
            </div>
            <div className={classes.body}>
                <div className={classes.body__upper}>
                    <h4
                        className={classes.name}
                    >{props.name}</h4>
                    <h4>{props.created_at}</h4>
                </div>
                <p className={classes.body__description}>
                    {props.description.length <= 200 ? props.description : shortcattedDescription}
                </p>
                <p className={classes.price}>
                    {props.price ?? "-"}
                </p>
                <div className={classes.body__footer}>
                    <div className={classes.photo}>
                        {
                            imgSrc
                                ? <img src={imgSrc} alt="Photo" />
                                : <img src='https://placehold.co/600x400' />
                        }
                    </div>
                    <h4> {props.phone} </h4>
                    <h4
                        className={classes.delete}
                        onClick={deletePost}
                    >Delete</h4>
                    {/* <h4 className={classes.more}> More </h4> */}
                </div>
            </div>
        </div>
    )
}