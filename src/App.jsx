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

  // Referencia para capturar el contenedor que se convertirá en PDF
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

    // Prompt actualizado con los datos reales del docente y la escuela
    const promptText = `Genera una planeacion didactica bajo la NEM para ${formData.grado}, campo formativo ${formData.campoFormativo}, tema ${formData.tema}.
Docente: ${formData.docenteNombre}
Escuela: ${formData.escuela}
Por favor redacta la planeación incluyendo de forma explícita los datos del docente y la escuela en la cabecera, sin usar textos entre corchetes ni placeholders.`

    try {
      const response = await fetch('https://enseniamx-backend.onrender.com/api/planeaciones/generar', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: promptText
      })

      if (!response.ok) {
        throw new Error(`Error en el servidor: ${response.status}`)
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

  // Función para exportar a PDF
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
    
      
        
        {/* Header */}
        
          EnseñIA MX
          Generador Inteligente de Planeaciones Didácticas (NEM)
        

        {/* Formulario */}
        
          Datos de la Planeación
          
          
            
              
                Nombre del Docente
                
              

              
                Escuela
                
              

              
                Grado Escolar
                
              

              
                Campo Formativo
                
              
            

            
              Tema / Proyecto
              
            

            
              {loading ? 'Generando planeación con IA...' : 'Generar Planeación'}
            
          
        

        {/* Error */}
        {error && (
          
            {error}
          
        )}

        {/* Resultado Renderizado con Markdown */}
        {resultado && (
          
            
              Resultado Generado
              
                 navigator.clipboard.writeText(resultado)}
                  className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 px-3 py-1.5 rounded-md font-medium transition"
                >
                  Copiar Texto
                
                
                  Descargar PDF
                
              
            
            
            {/* Elemento referenciado para exportar a PDF */}
            
              {resultado}
            
          
        )}

      
    
  )
}