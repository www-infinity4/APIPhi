const searchInput = document.querySelector("#search");
const resultCount = document.querySelector("#result-count");
const results = document.querySelector("#results");

function renderCatalog(catalog, query = "") {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const matches = catalog.filter((api) => {
    const searchableText = [
      api.name,
      api.category,
      api.provider,
      api.description,
      ...api.tags,
    ].join(" ").toLocaleLowerCase();
    return searchableText.includes(normalizedQuery);
  });

  results.replaceChildren();
  for (const api of matches) {
    const item = document.createElement("li");
    item.className = "card";

    const title = document.createElement("h2");
    title.textContent = api.name;
    item.append(title);

    const details = document.createElement("p");
    details.className = "details";
    details.textContent = `${api.provider} · ${api.category} · ${api.auth}`;
    item.append(details);

    const description = document.createElement("p");
    description.textContent = api.description;
    item.append(description);

    const documentation = document.createElement("a");
    documentation.href = api.docsUrl;
    documentation.textContent = "API documentation";
    documentation.target = "_blank";
    documentation.rel = "noopener noreferrer";
    item.append(documentation);

    results.append(item);
  }

  resultCount.textContent = matches.length
    ? `${matches.length} ${matches.length === 1 ? "API" : "APIs"} found`
    : "No APIs match your search.";
}

fetch("catalog.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Catalog request failed");
    }
    return response.json();
  })
  .then((catalog) => {
    renderCatalog(catalog);
    searchInput.addEventListener("input", () => renderCatalog(catalog, searchInput.value));
  })
  .catch(() => {
    resultCount.textContent = "The API catalog could not be loaded. Please try again later.";
  });
