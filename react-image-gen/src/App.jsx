// // simple image generator base 
// import { useState } from 'react'
// import { Configuration, OpenAIApi } from 'openai'
// import './App.css'

// function App() {
//   const [prompt, setPrompt] = useState('')
//   const [result, setResult] = useState('')
//   const [loading, setLoading] = useState(false)

//   const configuration = new Configuration({
//     // organization:"org-asd",
//     apiKey: import.meta.env.VITE_OPENAI_API_KEY,
//   })

//   delete configuration.baseOptions.headers['User-Agent'];

//   const openai = new OpenAIApi(configuration);

//   const generateImage = async () => {
//     setLoading(true)
//     const response = await openai.createImage({
//       prompt: prompt,
//       n: 1,
//       size: "512x512",
//     });
//     setLoading(false)
//     setResult(response.data.data[0].url)
//   };

//   return (
//     <div className="app">
//       <h1>React AI Image Generator</h1>
//       {loading ? (
//         <h2> Image generation in progress ... Please wait!</h2>
//       ) : (<></>)}
//       <div className="card">
//         <textarea
//           className="text-input"
//           placeholder="Enter a prompt"
//           onChange={(e) => setPrompt(e.target.value)}
//           row="5"
//           cols="50"
//         />
//         <br></br>
//         <button className="button" onClick={generateImage}>Generate Image</button>
//         <br></br>
//         {result.length > 0 ? (
//           <img className="result-image" src={result} alt="Generated Image" />
//         ) : (
//           <></>
//         )}
//       </div>
//       <p className="footer">
//         Powered by OpenAI
//       </p>
//     </div>
//   )
// }

// export default App



import { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'
import './App.css'

function App() {
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState([])
  const [imageGenerated, setImageGenerated] = useState(false)
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  })

  delete configuration.baseOptions.headers['User-Agent'];

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    setLoading(true)
    const response = await openai.createImage({
      prompt: selectedOptions.join('\n'),
      n: 1,
      size: "512x512",
    });
    setLoading(false)
    setResult(response.data.data[0].url)
    setImageGenerated(true)
  };


  const handleClick = (event) => {
    const option = event.target.textContent;

    // Toggle selection
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((selected) => selected !== option));
      event.target.style.backgroundColor = null;
      event.target.style.color = null;
    } else {
      setSelectedOptions([...selectedOptions, option]);
      event.target.style.backgroundColor = 'rgb(255, 159, 100';
      event.target.style.color = 'white';
    }
  };


  const handleReset = () => {
    setResult('');
    setSelectedOptions([]);
    setImageGenerated(false);

    const buttons = document.querySelectorAll('.list button');
    buttons.forEach((button) => {
      button.style.backgroundColor = null;
      button.style.color = null;
    });
  };


  return (
    <div className="app">
      <h1>Interior Design AI Visualizer</h1>
      <div id="selections">
        <div className="list">
          <h3>Style</h3>
          <li><button onClick={handleClick}>
            Brutalism </button></li>
          <li><button onClick={handleClick}>
            Post Modern</button></li>
          <li><button onClick={handleClick}>Mid-Century</button></li>
          <li><button onClick={handleClick}>Minimalism</button></li>
          <li><button onClick={handleClick}>Industrial</button></li>
          <li><button onClick={handleClick}>Maximalism</button></li>
          <li><button onClick={handleClick}>Scandinavian</button></li>
          <li><button onClick={handleClick}>Rustic Cabin</button></li>
          <li><button onClick={handleClick}>Japandi</button></li>
          <li><button onClick={handleClick}>Eclectic</button></li>
          <li><button onClick={handleClick}>Traditional</button></li>
          <li><button onClick={handleClick}>Mediterranean</button></li>
        </div>

        <div className="list">
          <h3>Room</h3>
          <li><button onClick={handleClick}>Kitchen</button></li>
          <li><button onClick={handleClick}>Powder Bathroom</button></li>
          <li><button onClick={handleClick}>Bedroom</button></li>
          <li><button onClick={handleClick}>Garden</button></li>
          <li><button onClick={handleClick}>Dining Room</button></li>
          <li><button onClick={handleClick}>Living Room</button></li>
          <li><button onClick={handleClick}>Primary Bathroom</button></li>
          <li><button onClick={handleClick}>Office</button></li>
          <li><button onClick={handleClick}>Baby Nursery</button></li>
          <li><button onClick={handleClick}>Guest Bedroom</button></li>
          <li><button onClick={handleClick}>Kids Bedroom</button></li>
          <li><button onClick={handleClick}>Closet</button></li>
        </div>

        <div className="list">
          <h3>Colors</h3>
          <li><button onClick={handleClick}>Army Green</button></li>
          <li><button onClick={handleClick}>Pure White</button></li>
          <li><button onClick={handleClick}>Charocal</button></li>
          <li><button onClick={handleClick}>Lavender</button></li>
          <li><button onClick={handleClick}>Terracotta</button></li>
          <li><button onClick={handleClick}>Citron</button></li>
          <li><button onClick={handleClick}>Maroon</button></li>
          <li><button onClick={handleClick}>Blush</button></li>
          <li><button onClick={handleClick}>Red</button></li>
          <li><button onClick={handleClick}>Navy Blue</button></li>
          <li><button onClick={handleClick}>Beige</button></li>
          <li><button onClick={handleClick}>Orange</button></li>


        </div>

        <div className="list">
          <h3>Materials</h3>
          <li><button onClick={handleClick}>Wood</button></li>
          <li><button onClick={handleClick}>Concrete</button></li>
          <li><button onClick={handleClick}>Steel</button></li>
          <li><button onClick={handleClick}>Natural</button></li>
          <li><button onClick={handleClick}>Brass</button></li>
          <li><button onClick={handleClick}>Tile</button></li>
          <li><button onClick={handleClick}>Plaster</button></li>
          <li><button onClick={handleClick}>Glass</button></li>
          <li><button onClick={handleClick}>Leather</button></li>
          <li><button onClick={handleClick}>Brick</button></li>
          <li><button onClick={handleClick}>Wallpaper</button></li>
          <li><button onClick={handleClick}>Polished Nickel</button></li>
        </div>
      </div>
      {loading ? (
        <h3 className="inProgressMsg"> Image generation in progress ... Please wait!</h3>
      ) : (<></>)}
      <div className="card">
        <br></br>
        <button className="button" id="generateBtn" onClick={generateImage}>Generate Image</button>
        {result.length > 0 && imageGenerated && (
          <button className="button reset-button" onClick={handleReset}>Reset</button>
        )}
        <br></br>
        {result.length > 0 ? (
          <img className="result-image" src={result} alt="Generated Image" />
        ) : (
          <></>
        )}
      </div>
      <p className="footer">
        Powered by OpenAI
      </p>
    </div>
  )
}

export default App