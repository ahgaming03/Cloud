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

const update = document.querySelectorAll("a.update");

update.forEach((btn) => {
    btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-doc");
        const form = document.querySelector(
            `form[action="/products/update/${id}"]`
        );
        form.submit();
    });
});
