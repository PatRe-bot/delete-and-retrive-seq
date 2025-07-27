import { SeqDetail } from "./components/SeqDetail"
import { DelAndRetProvider } from "./contexts/DelAndRetProvider"

function App() {

  return (
    <DelAndRetProvider>
      <SeqDetail / >
    </DelAndRetProvider>
  )
}

export default App
