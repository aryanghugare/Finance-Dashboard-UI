import Layout from './Layout'
import Topbar from './Topbar'

export default function PageShell({ children }) {
  return (
    <Layout>
      <Topbar />
      {children}
    </Layout>
  )
}
