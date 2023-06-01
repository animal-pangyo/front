import AdminNav from '../../common/admin/nav/AdminNav';
import AdminTop from '../../common/admin/top/AdminTop';
import styled from './admin-layer.module.css';

const AuthLayer = ({ children }) => (
  <div className={styled.layer}>
    <AdminNav />
    <div className={styled.right}>
      <AdminTop />
      <main className={styled.content}>
        { children }
      </main>
    </div>
  </div>
)

export default AuthLayer;