const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer p-6 bg-gray-600 text-primary-content footer-center">
      <p className="font-semibold">
        Copyright &copy; {year} All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
