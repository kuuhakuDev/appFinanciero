export default function getToken(){
    function random() {
        return Math.random().toString(36).substr(2); // Eliminar `0.`
      };
    
      function token() {
        return random() + random() + random() + random() + random(); // Para hacer el token más largo
      };

      return 'Bearer ' + token();
}