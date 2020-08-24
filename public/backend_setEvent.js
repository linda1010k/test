const cross = document.querySelectorAll("#cross-family");
for (let i = 0; i < cross.length; i++) {
  cross[i].addEventListener("click", async (test) => {
    test.stopPropagation();
    let id = cross[i].getAttribute("cross-id");
    console.log(id);
    let apiUrl = `https://git.heroku.com/practiceproject001.git/API/deleteMember?id=${id}`;
    let res = await fetch(apiUrl, { method: "GET" });
    let text = await res.text();
    console.log(text);
    console.log("in the cross, id = ", id);
    // call delete api
  });
}
function delForm() {
  if (confirm("Do you really want to delete this member?")) {
    alert("Delete confirm");
    window.location.reload();
  }
}
