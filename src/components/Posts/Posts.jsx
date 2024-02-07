import classes from './Posts.module.css';
import { categories, regions, posts } from '../../data';
import Post from '../Post/Post';
import { useEffect, useState } from 'react';
import AddButton from '../AddButton/AddButton';

import Modal from '../Modal/Modal';



export default function Posts({ buttonHandler }) {
    const [category, setCategory] = useState('');
    const [region, setRegion] = useState('');
    const [search, setSearch] = useState('');

    const [data, setData] = useState([]);
    const [fetching, setFetching] = useState(true);
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
        if(!isAllPosts){
            const response = await fetch(`http://back.ru/getPosts.php?start=${postsPosition[0]}&end=${postsPosition[1]}`);
            const json = await response.json();
            console.log(json);
            if (json.length === 0) {
                alert('All!');
                setIsAllPosts(true);
                setFetching(false);
                return;
            };
    
            const length = data.length + json.length;
            setData([...data, ...json]);
            setPostsPosition((prev) => {
                prev[0] = length;
                console.log(prev);
                return prev;
            })
            setFetching(false);
        }
    }

    async function pushAddedPostToPostList(){
        const response = await fetch(`http://back.ru/getPosts.php?start=0&end=1`);
        const post = await response.json();
        console.log("First post: ", post);
        setData([...post, ...data]);
        setNewPost(false);
    }

    useEffect(() => {
        if(newPost){
            pushAddedPostToPostList()
        }
    }, [newPost])

    useEffect(() => {
        if(fetching){
            getData();
        }
    }, [fetching])

    useEffect(() => {
        document.addEventListener("scroll", scrollHandler);

        return function () {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, [])

    const scrollHandler = (e) => {
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 50){
            setFetching(true);
        }
    }

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
                {
                    data
                        .filter((post) => {
                            const isSelectedCategory = post.category.includes(category) || category === 'Select category';
                            const isSelectedRegion = post.region.includes(region) || region === 'Select region';
                            const isSearched = post.name.toLowerCase().includes(search.toLowerCase()) || post.description.toLowerCase().includes(search.toLowerCase());
                            if (isSelectedCategory && isSelectedRegion && isSearched) return true;
                        })
                        .map((post) => <Post deletePostFn={deletePostFromList} key={post.id} {...post} />)
                }
            </div>
            <p
                className={classes.more}
                onClick={getData}
            >More
            </p>

            <AddButton buttonHandler={useModal}>
                Add product
            </AddButton>

            {modal && <Modal newPosthandler={setNewPost} closeHandler={useModal} />}
        </section>
    )
}