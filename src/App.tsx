import { useState } from 'react'

type RemixType = 'tweet' | 'blog' | 'formal' | 'casual'

const REMIX_TYPES: { [key in RemixType]: string } = {
  tweet: 'Convertir a Tweet',
  blog: 'Formato Blog',
  formal: 'Tono Formal',
  casual: 'Tono Casual'
}

// Simulación local de remixes mientras no tengamos la API
const mockRemix = (text: string, type: RemixType): string => {
  const prefix = {
    tweet: '🐦 ',
    blog: '📝 ',
    formal: '👔 ',
    casual: '😊 '
  }
  
  return `${prefix[type]}${text.slice(0, 100)}${text.length > 100 ? '...' : ''}\n\n(Versión de prueba - API no conectada)`
}

function App() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedType, setSelectedType] = useState<RemixType>('tweet')
  const [error, setError] = useState('')

  const handleRemix = async () => {
    setIsLoading(true)
    setError('')
    try {
      // Simulación de delay para dar sensación de procesamiento
      await new Promise(resolve => setTimeout(resolve, 1000))
      setOutputText(mockRemix(inputText, selectedType))
    } catch (error) {
      console.error('Error:', error)
      setError('Hubo un error al procesar tu solicitud. Por favor intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Remixer</h1>
        
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Remix
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(REMIX_TYPES).map(([type, label]) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type as RemixType)}
                    className={`p-2 rounded ${
                      selectedType === type
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            
            <textarea
              className="w-full h-32 p-2 border rounded"
              placeholder="Pega aquí el contenido que quieres remixear..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded">
              {error}
            </div>
          )}

          <button
            onClick={handleRemix}
            disabled={isLoading || !inputText}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isLoading ? 'Remixeando...' : 'Remixear'}
          </button>

          {outputText && (
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">Resultado:</h2>
              <p className="whitespace-pre-wrap">{outputText}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
