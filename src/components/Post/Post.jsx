import classes from './Post.module.css';

export default function Post(props){
    return(
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
                    >{ props.name }</h4>
                    <h4>{ props.date }</h4>
                </div>
                <p className={classes.body__description}>
                    {props.description}
                </p>
                <p className={classes.price}>
                    {props.price ?? "-"}
                </p>
                <div className={classes.body__footer}>
                    <h4> {props.phone} </h4>
                    <h4 className={classes.more}> More </h4>
                </div>  
            </div>
        </div>
    )
}