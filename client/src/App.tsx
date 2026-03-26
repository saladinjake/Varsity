import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Toaster position="top-center" reverseOrder={false} />
        <div className="min-h-screen flex flex-col bg-[#fcfdfe] text-[#0f172a] font-jakarta antialiased">
          <Routes>

            <Route path="*" element={
              <>

                <main className="flex-grow pt-24">
                  build online e-learning system
                </main>
              </>
            } />

          </Routes>


        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
