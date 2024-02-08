import classes from './Posts.module.css';
import { categories, regions, posts } from '../../data';
import Post from '../Post/Post';
import { useEffect, useState } from 'react';
import AddButton from '../AddButton/AddButton';

import Modal from '../Modal/Modal';



export default function Posts({ buttonHandler }) {
    // TODO: Отсылать ли новый запрос при установке фильтра. Сейчас скачиваются все посты по порядку. Благодаря тому, что перенёс setFetching функция работает, пока не скачаются посты, удовлетворяющие выбранным фильтрам.
    
    // Как при изменении филтров подкачивать те посты, которые ещё не были скачены и добавлять их в список к уже загруженным?

    // Добавить в запрос к бэку параметры категория и регион => Скачивать только нужные посты => При изменении категории или региона очищать стейт с постами и скачивать всё с нуля
    const [category, setCategory] = useState('');
    const [region, setRegion] = useState('');
    const [search, setSearch] = useState('');

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    let [postsPosition, setPostsPosition] = useState([0, 4]);
    const [isAllPosts, setIsAllPosts] = useState(false);

    const [modal, useModal] = useState(false);
    const [newPost, setNewPost] = useState(false);

    
    function deletePostFromList(id){
        const dataWithoutDeletedPost = data.filter((post) =>{
            if(post.id !== id) return true;
        })
        setData(dataWithoutDeletedPost);
    }


    async function getData() {
        if(isLoading) {
            console.log('IS LOADING');
            return
        }

        console.log("I am in get data");
        console.log('%cAll posts is ' + isAllPosts, 'color: white; background-color: tomato;');
        if(!isAllPosts){
            setIsLoading(true);
            const response = await fetch(`http://back.ru/getPosts.php?start=${postsPosition[0]}&end=${postsPosition[1]}`);
            const json = await response.json();
            console.log(json);
            // console.clear();

            if (json.length === 0) {
                alert('All!');
                console.log('=================================================================');
                console.log('Length = 0');
                setIsAllPosts(true);
                setIsLoading(false);
                // setFetching(false);
                return;
            };
    
            const length = data.length + json.length;
            console.log('Final Length', length);
            console.log('data', data);
            const res = [...data, ...json];
            console.log('res', res);
            setData(res);
            setPostsPosition((prev) => {
                prev[0] = length;
                return prev;
            })
            // setFetching(false);
            
            setIsLoading(false);
        }
    }

    async function pushAddedPostToPostList(){
        const response = await fetch(`http://back.ru/getPosts.php?start=0&end=1`);
        const post = await response.json();
        console.log("First post: ", post);
        setData([...post, ...data]);
        setNewPost(false);
    }

    useEffect(function () {
        // alert('changed');
        // console.clear();
        console.log('Data ', data);
        console.log('%cAll posts is ' + isAllPosts, 'color: white; background-color: tomato;');
    }, [isAllPosts, setIsAllPosts, data, setData])


    useEffect(() => {
        if(newPost){
            pushAddedPostToPostList()
        }
    }, [newPost])

    // useEffect(() => {
    //     console.log("I am in useEffect");
    //     if(fetching){
    //         console.log("Use effect work");
    //         getData();
    //         // setFetching(false);
    //     }
    // }, [fetching])

    useEffect(()=> {
        getData();
    }, [])

    useEffect(() => {

        const scrollHandler = (e) => {
            if(isLoading) {
                console.log('still LOADING');
                return
            }
            const offsetToBottom = e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight);
            if(offsetToBottom < 50 && !isAllPosts){
                console.warn("2 scroll handler");
                console.log(isAllPosts);
                getData();
                // setFetching(true);
            }
        }

        window.addEventListener("scroll", scrollHandler);
        

        return function () {
            window.removeEventListener('scroll', scrollHandler);
        }
    }, [isLoading])

    return (
        <section className='container'>
            <div className={classes.filtres}>
                <div className={classes.selects}>
                    <select
                        name="category"
                        id=""
                        value={category}
                        onChange={(e) => {
                            setIsAllPosts(false)
                            setCategory(e.target.value)
                        }}
                    >
                        {
                            categories.map((category, index) => {
                                return <option key={index}> {category} </option>
                            })
                        }
                    </select>
                    <select
                        name="region"
                        id=""
                        value={region}
                        onChange={(e) => {
                            setRegion(e.target.value)
                            setIsAllPosts(false)
                        }}
                    >
                        {
                            regions.map((region, index) => {
                                return <option key={index}> {region} </option>
                            })
                        }
                    </select>
                </div>
                <input
                    type="text"
                    className={classes.search}
                    placeholder='Search'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className={classes.postsWrapper}>
            {console.log(data)}
                {
                    data
                        // .filter((post) => {
                        //     const isSelectedCategory = post.category.includes(category) || category === 'Select category';
                        //     const isSelectedRegion = post.region.includes(region) || region === 'Select region';
                        //     const isSearched = post.name.toLowerCase().includes(search.toLowerCase()) || post.description.toLowerCase().includes(search.toLowerCase());
                        //     if (isSelectedCategory && isSelectedRegion && isSearched) return true;
                        // })
                        .map((post) => <Post deletePostFn={deletePostFromList} key={post.id} {...post} />)
                }
            </div>

            { isAllPosts &&
            <p
                className={classes.more}
            >All
            </p>
            }

            <AddButton buttonHandler={useModal}>
                Add product
            </AddButton>

            {modal && <Modal newPosthandler={setNewPost} closeHandler={useModal} />}
        </section>
    )
}