import { useState, useRef } from 'react'
import Markdown from 'react-markdown'
import html2pdf from 'html2pdf.js'

export default function App() {
  const [formData, setFormData] = useState({
    grado: '3 de primaria',
    campoFormativo: 'Lenguajes',
    tema: 'textos instructivos',
    docenteNombre: 'Profe Juan Pérez',
    escuela: 'Escuela Primaria Lic. Benito Juárez'
  })

  const [loading, setLoading] = useState(false)
  const [resultado, setResultado] = useState('')
  const [error, setError] = useState('')

  const pdfRef = useRef(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResultado('')

    const promptText = "Genera una planeacion didactica bajo la NEM para " + formData.grado + ", campo formativo " + formData.campoFormativo + ", tema " + formData.tema + ". Docente: " + formData.docenteNombre + ". Escuela: " + formData.escuela + ". Redacta la planeación incluyendo de forma explícita los datos del docente y la escuela en la cabecera, sin usar textos entre corchetes ni placeholders."

    try {
      const response = await fetch('https://enseniamx-backend.onrender.com/api/planeaciones/generar', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: promptText
      })

      if (!response.ok) {
        throw new Error("Error en el servidor: " + response.status)
      }

      const rawText = await response.text()
      
      try {
        const json = JSON.parse(rawText)
        const textContent = json.candidates?.[0]?.content?.parts?.[0]?.text || rawText
        setResultado(textContent)
      } catch (e) {
        setResultado(rawText)
      }

    } catch (err) {
      console.error('Error al generar la planeación:', err)
      setError('Ocurrió un error al conectar con el servidor. Revisa los registros en Render.')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadPDF = () => {
    const element = pdfRef.current
    if (!element) return

    const opt = {
      margin:       0.5,
      filename:     `Planeacion_${formData.tema.replace(/\s+/g, '_')}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    }

    html2pdf().set(opt).from(element).save()
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="bg-blue-700 text-white rounded-xl p-6 shadow-md">
          <h1 className="text-3xl font-bold">EnseñIA MX</h1>
          <p className="text-blue-100 mt-1">Generador Inteligente de Planeaciones Didácticas (NEM)</p>
        </header>

        {/* Formulario */}
        <section className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
          <h2 className="text-xl font-semibold mb-4 text-slate-800">Datos de la Planeación</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nombre del Docente</label>
                <input
                  type="text"
                  name="docenteNombre"
                  value={formData.docenteNombre}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Escuela</label>
                <input
                  type="text"
                  name="escuela"
                  value={formData.escuela}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Grado Escolar</label>
                <input
                  type="text"
                  name="grado"
                  value={formData.grado}
                  onChange={handleChange}
                  placeholder="Ej. 3 de primaria"
                  className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Campo Formativo</label>
                <input
                  type="text"
                  name="campoFormativo"
                  value={formData.campoFormativo}
                  onChange={handleChange}
                  placeholder="Ej. Lenguajes"
                  className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tema / Proyecto</label>
              <input
                type="text"
                name="tema"
                value={formData.tema}
                onChange={handleChange}
                placeholder="Ej. textos instructivos"
                className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow transition duration-200 disabled:opacity-50"
            >
              {loading ? 'Generando planeación con IA...' : 'Generar Planeación'}
            </button>
          </form>
        </section>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl shadow-sm">
            {error}
          </div>
        )}

        {/* Resultado Renderizado con Markdown */}
        {resultado && (
          <section className="bg-white p-6 rounded-xl shadow-md border border-slate-200 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-semibold text-slate-800">Resultado Generado</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => navigator.clipboard.writeText(resultado)}
                  className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 px-3 py-1.5 rounded-md font-medium transition"
                >
                  Copiar Texto
                </button>
                <button 
                  onClick={handleDownloadPDF}
                  className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-md font-medium transition shadow-sm"
                >
                  Descargar PDF
                </button>
              </div>
            </div>
            
            <div ref={pdfRef} className="prose max-w-none text-slate-700 leading-relaxed max-h-[600px] overflow-y-auto pr-2 p-2">
              <Markdown>{resultado}</Markdown>
            </div>
          </section>
        )}

      </div>
    </div>
  )
}
