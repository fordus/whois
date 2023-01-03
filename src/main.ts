import './index.css'
import getWhois from './getWhois'

const $ = (selector: string): any => document.querySelector(selector)
const $results = $('#results') as HTMLPreElement
const $form = $('#form') as HTMLFormElement
const $input = $('#input') as HTMLInputElement
const $loading = $('#loading') as HTMLDivElement

$form.addEventListener('submit', event => {
  event.preventDefault()
  $results.innerHTML =
    '<div class="text-center"><span class="text-cyan-500 font-bold">Fetching data...</span></div>'
  $loading.classList.replace('hidden', 'flex')

  const { value }: { value: string } = $input
  if (value === '') return

  getWhois(value)
    .then(data => {
      $loading.classList.replace('flex', 'hidden')
      console.log('🚀 ~ file: main.ts ~ line 12 ~ data', data)

      $results.innerHTML = `
      <div class="p-4">
      <div class=""><span class="text-blue-500 font-bold">NAME:</span> ${
        data?.domain ?? 'N/A'
      }</div>
      <div class=""><span class="text-blue-500 font-bold">EXPIRE:</span> ${
        data?.expires_at ?? 'N/A'
      }</div>
      </div>

      <pre class="text-white bg-[#0d0d0d] rounded-md py-4 overflow-x-auto">{${JSON.stringify(
        data,
        undefined,
        2
      )}}</pre>
      `
    })
    .catch(error => {
      // $loading.classList.replace('flex', 'hidden')
      console.error('🚀 ~ file: main.ts ~ line 16 ~ error', error)
      $results.innerHTML =
        '<div class="text-center"><span class="text-red-700 font-bold">ERROR:</span> Failed to get info. Try again.</div>'
    })
})
