import classes from './Links.module.css';

export default function Links(){
    return(
        <section className={classes.links_bg}>
            <div className={`container ${classes.links}`}>
                <a href="">Погода</a>
                <a href="">Словарь</a>
                <a href="">Новости</a>
                <a href="">Курс валют</a>
                <a href="">Знакомства</a>
                <a href="">Афиша</a>
                <a href="">Гос услуги</a>
                <a href="">ШАББАТ</a>
                <a href="">Страховка</a>
            </div>
        </section>
    )
}