
const API_KEY=sk-proj-RqopmsEFJjimIV4fWMEtT3BlbkFJ5bauMrKbTaVTudBKDrqG;
async function fetchData(){
  const response = await fetch("https://api.openai.com/v1/chat/completions",{
method:"POST",
headers:{
  Authorization:`Bearer ${API_KEY}`,
  'Content-Type': 'application/json'
},
body: JSON.stringify({
model: "text-dayinci-003",
prompt: "hello, how are you today"
})
})
const data =await response.json()
console.log(data)
}
fetchData()