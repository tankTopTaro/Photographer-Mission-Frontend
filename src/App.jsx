import { Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import Gallery from './layouts/Gallery'
import Single from './layouts/Single'
import RemoteCheck from './checks/RemoteCheck'
import InviteCheck from './checks/InviteCheck'
import NotFound from './checks/NotFound'

const App = () => {
  
  return (
    <Routes>
      <Route path="/photographer/album/:albumId/user/:userId/:token" element={<Layout><Gallery /></Layout>}/>
      <Route path="/photographer/album/:albumId/user/:userId/capture/:captureId/:token" element={<Layout><Single /></Layout>}/>

      <Route path="/photographer/remote/:remoteId/:token" element={<RemoteCheck />} />
      <Route path="/photographer/album/:albumId/:token" element={<InviteCheck />} />
    
      <Route path='*' element={<NotFound />} />
    </Routes> 
  )
}

export default App