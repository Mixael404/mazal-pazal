import classes from './Modal.module.css';
import { categories, regions } from '../../data';
import { useState } from 'react';

export default function Modal({ closeHandler, newPosthandler }) {
    let formData = new FormData();
    let [emptyRegion, setRegion] = useState(false);
    const [emptyCategory, setCategory] = useState(false);


    function handleInput(e) {
        const fieldName = e.target.name;
        if (formData.has(fieldName)) formData.delete(fieldName);
        formData.append(fieldName, e.target.value);
    }

    function handleRegion(e) {
        setRegion(false);
        // setForm((prev) => ({
        //     ...prev,
        //     region: e.target.value,
        // }));
        if (formData.has('region')) formData.delete('region');
        formData.append('region', e.target.value);
    }

    function handleCategory(e) {
        setCategory(false);
        if (formData.has('category')) formData.delete('category');
        // setForm((prev) => ({
        //     ...prev,
        //     category: e.target.value,
        // }));
        formData.append('category', e.target.value);
    }

    function handleImage(e) {
        if (formData.has('image')) formData.delete('image');
        formData.append('image', e.target.files[0]);
    }


    async function addProduct(e) {
        e.preventDefault();

        if (!formData.has('category') || !formData.has('region')) {
            if (!formData.has('category')) setCategory(true);
            if (!formData.has('region')) setRegion(true);
            return;
        };

        let date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        formData.append('createdAt', formattedDate);
        fetch('http://back.ru/add.php', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.text())
            .then((response) => {
                console.log(response)
                newPosthandler(true);
            })

        closeHandler(false);
    }

    return (
        <div className={classes.modal__bg}>
            <div className={classes.modal__body}>
                <span
                    className={classes.close}
                    onClick={() => {
                        closeHandler(false);
                    }}
                > &#10006;
                </span>
                <h3 className={classes.title}>Add new item</h3>
                <form
                    action="http://back.ru/add.php"
                    method='POST'
                    onSubmit={addProduct}
                >
                    <input
                        name='name'
                        type="text"
                        placeholder='Name'
                        onChange={handleInput}
                        required
                    />
                    <textarea
                        placeholder='Description'
                        name="description"
                        rows={5}
                        onChange={handleInput}
                        required
                    >
                    </textarea>
                    <input
                        name='price'
                        type="text"
                        placeholder='Price'
                        onChange={handleInput}
                        required
                    />
                    <input
                        name='phone'
                        type="text"
                        placeholder='Phone'
                        onChange={handleInput}
                        required
                    />
                    <select
                        className={emptyCategory ? classes.emptySelect : ''}
                        name="category"
                        id=""
                        onChange={handleCategory}
                        defaultValue={"Select category"}
                    >
                        {categories
                            .map((category, index) => {
                                return <option disabled={index == 0} key={index}>{category}</option>
                            })
                        }
                    </select>
                    <select
                        className={emptyRegion ? classes.emptySelect : ''}
                        name="region"
                        id=""
                        onChange={handleRegion}
                        defaultValue={"Select region"}
                    >
                        {regions
                            .map((region, index) => {
                                return <option disabled={index == 0} key={index}>{region}</option>
                            })
                        }
                    </select>
                    <input type="file"
                        onChange={handleImage}
                    />
                    <input
                        type="submit"
                        value={"Send"}
                        className={classes.submit}
                    />
                </form>
            </div>
        </div>
    )
}