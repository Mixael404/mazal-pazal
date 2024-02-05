import classes from './Posts.module.css';
import { categories, regions, posts } from '../../data';
import Post from '../Post/Post';
import { useEffect, useState } from 'react';
import AddButton from '../AddButton/AddButton';

export default function Posts({ buttonHandler }) {
    const [category, setCategory] = useState('');
    const [region, setRegion] = useState('');
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [fetching, setFetching] = useState(true);
    let [postsPosition, setPostsPosition] = useState([0, 4]);
    const [allPosts, setAllPosts] = useState(false);


    async function getData() {
        if(!allPosts){
            const response = await fetch(`http://back.ru/getPosts.php?start=${postsPosition[0]}&end=${postsPosition[1]}`);
            const json = await response.json();
            console.log(json);
            if (json.length === 0) {
                alert('All!');
                setAllPosts(true);
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
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100){
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
                        onChange={(e) => setCategory(e.target.value)}
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
                        onChange={(e) => setRegion(e.target.value)}
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
                        .map((post, index) => <Post changeData={setData} data={data} key={index} {...post} />)
                }
            </div>
            <p
                className={classes.more}
                onClick={getData}
            >More
            </p>

            <AddButton buttonHandler={buttonHandler}>
                Add product
            </AddButton>
        </section>
    )
}