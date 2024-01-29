import classes from './Posts.module.css';
import { categories, regions, posts } from '../../data';
import Post from '../Post/Post';
import { useState } from 'react';
import AddButton from '../AddButton/AddButton';

export default function Posts({buttonHandler}) {
    const [category, setCategory] = useState('');
    const [region, setRegion] = useState('');
    const [search, setSearch] = useState('');

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
                    posts
                        .filter((post) => {
                            const isSelectedCategory = post.category.includes(category) || category === 'Select category';
                            const isSelectedRegion = post.region.includes(region) || region === 'Select region';
                            const isSearched = post.name.toLowerCase().includes(search.toLowerCase()) || post.description.toLowerCase().includes(search.toLowerCase());
                            if (isSelectedCategory && isSelectedRegion && isSearched) return true;
                        })
                        .map((post, index) => <Post key={index} {...post} />)
                }
            </div>
            <AddButton buttonHandler={buttonHandler}>
                Add product
            </AddButton>
        </section>
    )
}