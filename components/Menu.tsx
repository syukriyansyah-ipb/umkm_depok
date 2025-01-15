import Link from "next/link";
import { motion } from "framer-motion";

const Menu: React.FC = () => {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="logo">E-Commerce</div>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/products">Products</Link></li>
        <li><Link href="/admin">Admin</Link></li>
      </ul>
    </motion.nav>
  );
};

export default Menu;
