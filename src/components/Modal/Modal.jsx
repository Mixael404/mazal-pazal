import classes from './Modal.module.css';
import { categories, regions } from '../../data';
import { useEffect, useState } from 'react';

export default function Modal({ closeHandler }) {


    const [form, setForm] = useState({});


    let [emptyRegion, setRegion] = useState(false);
    const [emptyCategory, setCategory] = useState(false);



    function handleInput(e) {
        const fieldName = e.target.name;
        setForm((prev) => ({
            ...prev,
            [fieldName]: e.target.value,
        }));
    }

    function handleRegion(e) {
        setRegion(false);
        setForm((prev) => ({
            ...prev,
            region: e.target.value,
        }));
    }

    function handleCategory(e) {
        setCategory(false);
        setForm((prev) => ({
            ...prev,
            category: e.target.value,
        }));
    }


    async function addProduct(e) {
        e.preventDefault();

        if(!form.category || !form.region) {
            if(!form.category) setCategory(true);
            if(!form.region) setRegion(true);
            return;
        };

        fetch('http://back.ru/add.php', {
            method: 'POST',
            body: JSON.stringify(form)
        })
            .then((response) => response.text())
            .then((response => console.log(response)))

        closeHandler(false);
    }



    return (
        <div className={classes.modal__bg}>
            <div className={classes.modal__body}>
                <span
                    className={classes.close}
                    onClick={() => closeHandler(false)}
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