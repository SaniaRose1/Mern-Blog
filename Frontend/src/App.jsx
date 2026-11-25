import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Blog } from './Blog.jsx'

 function App() {
    const queryClient = new QueryClient()
 return (
 <QueryClientProvider client={queryClient}>
 <Blog />
 </QueryClientProvider>
 )
}

export default App;