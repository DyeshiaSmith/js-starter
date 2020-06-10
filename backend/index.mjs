import http from 'http'

http.createServer((_, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.end('<h1>Dyeshia</h1>')
}).listen(5000, () => {
  console.log('Server running')
})
