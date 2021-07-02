import React, { useState, useEffect } from "react";
import axios from "axios";

function Search() {
  const [term, setTerm] = useState("programming");
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [term]);
  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: debouncedTerm,
        },
      });
      setResults(data?.query?.search);
    };
    search();
  }, [debouncedTerm]);
  //   useEffect(() => {
  //     const search = async () => {
  //       const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
  //         params: {
  //           action: "query",
  //           list: "search",
  //           origin: "*",
  //           format: "json",
  //           srsearch: term,
  //         },
  //       });
  //       setResults(data?.query?.search);
  //     };
  //     if (term && !results.length) {
  //       search();
  //     } else {
  //       const timeoutId = setTimeout(() => {
  //         if (term) search();
  //       }, 500);
  //       return () => {
  //         clearTimeout(timeoutId); // this one is called everytime we rerender first then everything else after
  //       };
  //     }
  //   }, [term, results.length]); // when we added results.length to the arr it created a problem so we changed the whole logic

  const renderedResults = results?.map((res) => {
    return (
      <div className="item" key={res.pageid}>
        <div className="right floated content">
          <a
            href={`https://en.wikipedia.org?curid=${res.pageid}`}
            className="ui button"
          >
            {" "}
            Go{" "}
          </a>
        </div>
        <div className="content">
          <div className="header">{res?.title}</div>
          <span dangerouslySetInnerHTML={{ __html: res.snippet }}></span>
        </div>
      </div>
    );
  });
  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter search term</label>
          <input
            className="input"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
}

export default Search;
