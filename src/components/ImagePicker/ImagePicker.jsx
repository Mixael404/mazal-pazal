export default function ImagePicker(){

    let formData = new FormData();

    async function handleSubmit(e){
        e.preventDefault();
        // console.log("Submit");
        // const values = formData.values();
        // for (const value of values) {
        //     console.log(value);
        // }
        
        // const data = {};
        // formData.forEach((value, key) => {
        //     data[key] = value;
        // })
        // console.log(data);

        fetch('http://back.ru/test.php', {
            method: "POST",
            body: formData,
        })
            .then(res => res.text())
            .then(res => console.log(res))

    }

    function inputHandler(e){
        const fieldName = e.target.name;
        if(formData.has(fieldName)) formData.delete(fieldName);
        formData.append(fieldName, e.target.value);
    }
    function imgHandler(e){
        const fieldName = e.target.name;
        if(formData.has(fieldName)) formData.delete(fieldName);
        formData.append("image", e.target.files[0]);
    }

    return(
        <section>
            <form
            onSubmit={handleSubmit}
            >
                <p><input 
                type="text" 
                name="name"
                onChange={inputHandler}
                 /></p>
                <p><input 
                type="text" 
                name="email"
                onChange={inputHandler}
                 /></p>
                <p><input 
                type="file" 
                name="img"
                onChange={imgHandler}
                /></p>
                <p><input type="submit" /></p>
                
                
            </form>
        </section>
    )
}