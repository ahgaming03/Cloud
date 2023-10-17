// delete product
const trash = document.querySelectorAll("a.delete");

trash.forEach((item) => {
    item.addEventListener("click", (e) => {
        e.preventDefault();
        const endpoint = "/products/" + e.target.getAttribute("data-doc");
        fetch(endpoint, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                window.location.href = data.redirect;
            })
            .catch((err) => {
                console.error(err);
            });
    });
});

// update product
const formUpdate = document.querySelectorAll("form.updateProduct");
const inputUpdate = document.querySelectorAll("input[type=file].updateProduct");

formUpdate.forEach((form) => {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log("form submitting");
        document.getElementById("btnUpdate").disabled = true;
        const endpoint =
            "/products/update/" + e.target.getAttribute("data-doc");
        const formData = new FormData(form);
        await fetch(endpoint, {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                window.location.href = data.redirect;
            })
            .catch((err) => {
                console.error(err);
            });
    });
});

// add product
const formAdd = document.querySelector("form.addProduct");
const input = document.querySelector("input[type=file].addProduct");

formAdd.addEventListener("submit", async (e) => {
    e.preventDefault();
    document.getElementById("btnAdd").disabled = true;
    console.log("form submitting");
    const formData = new FormData(formAdd);
    await fetch("/products/create", {
        method: "POST",
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            window.location.href = data.redirect;
        })
        .catch((err) => {
            console.error(err);
        });
});

// change image when file is selected
function previewImage(event) {
    const reader = new FileReader();

    if (event.target.files.length === 0) {
        const output = document.getElementById("preview");
        output.src = "/assets/img/default_image.jpg";
        return;
    }
    reader.onload = function () {
        const output = document.getElementById("preview");
        output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}

function previewImageUpdate(event) {
    const reader = new FileReader();
    const input = event.target;
    const id = input.getAttribute("data-id");
    
    if (event.target.files.length === 0) {
        const output = document.getElementById("preview-" + id);
        output.src = "/assets/img/default_image.jpg";
        return;
    }
    reader.onload = function () {
        const output = document.getElementById("preview-" + id);
        output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}
