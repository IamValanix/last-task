from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import bcrypt
import os
from dotenv import load_dotenv

# Cargar variables del archivo .env
load_dotenv()

# Inicializar Flask
app = Flask(__name__)
CORS(app)

# Función para obtener una nueva conexión a la base de datos
def get_connection():
    return psycopg2.connect(
        host=os.getenv("DB_HOST"),
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD")
    )

# ===================== REGISTRO ====================
@app.route('/register', methods=['POST'])
def register():
    connection = None
    cursor = None
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        age = data.get('age')

        if not all([name, email, password, age]):
            return jsonify({'error': 'Todos los campos son obligatorios'}), 400

        connection = get_connection()
        cursor = connection.cursor()

        # Verificar si el email ya existe
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        if cursor.fetchone():
            return jsonify({'error': 'El correo ya está registrado'}), 409

        # Hashear la contraseña
        hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        # Insertar en la base de datos
        cursor.execute("""
            INSERT INTO users (name, email, password_hash, age)
            VALUES (%s, %s, %s, %s)
        """, (name, email, hashed_pw, age))
        connection.commit()

        return jsonify({'message': 'Usuario registrado exitosamente'}), 201

    except Exception as e:
        print("❌ Error en /register:", e)
        return jsonify({'error': 'Error interno del servidor'}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

# ======================= LOGIN =======================
@app.route('/login', methods=['POST'])
def login():
    connection = None
    cursor = None
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({'success': False, 'message': 'Email y contraseña requeridos'}), 400

        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute("SELECT password_hash, name FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()

        if not user:
            return jsonify({'success': False, 'message': 'Usuario no encontrado'}), 404

        hashed_password, name = user
        if bcrypt.checkpw(password.encode('utf-8'), bytes(hashed_password)):
            return jsonify({'success': True, 'message': 'Login exitoso', 'name': name})
        else:
            return jsonify({'success': False, 'message': 'Contraseña incorrecta'}), 401

    except Exception as e:
        print("❌ Error en /login:", e)
        return jsonify({'success': False, 'message': 'Error interno del servidor'}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

# ======================= CHECK USER ===================
@app.route('/checkUser', methods=['POST'])
def check_user():
    connection = None
    cursor = None
    try:
        data = request.get_json()
        username = data.get('username')

        if not username:
            return jsonify({'exists': False, 'error': 'Nombre de usuario requerido'}), 400

        username = username.strip()  # Elimina espacios
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute("SELECT 1 FROM users WHERE LOWER(TRIM(name)) = LOWER(TRIM(%s))", (username,))
        exists = cursor.fetchone() is not None

        return jsonify({'exists': exists})

    except Exception as e:
        print("❌ Error en /checkUser:", e)
        return jsonify({'exists': False, 'error': 'Error interno del servidor'}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
# =============== ADMIN - LISTAR USUARIOS ===============
@app.route('/admin/usuarios', methods=['GET'])
def get_usuarios():
    connection = None
    cursor = None
    try:
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute("""
            SELECT user_id, name, email, age, role, created_at 
            FROM users
            ORDER BY created_at ASC
        """)

        usuarios = []
        for user in cursor.fetchall():
            usuarios.append({
                'user_id': user[0],
                'name': user[1],
                'email': user[2],
                'age': user[3],
                'role': user[4],
                'created_at': user[5].isoformat() if user[5] else None
            })

        return jsonify(usuarios)

    except Exception as e:
        print("❌ Error al obtener usuarios:", e)
        return jsonify({'error': 'Error al obtener usuarios'}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
# ============= ADMIN - EDITAR USUARIOS =================
@app.route('/admin/usuarios/<int:user_id>', methods=['PUT'])
def update_usuario(user_id):
    connection = None
    cursor = None
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')

        if not name or not email:
            return jsonify({'error': 'Nombre y correo son requeridos'}), 400

        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute("""
            UPDATE users 
            SET name = %s, email = %s
            WHERE user_id = %s
        """, (name, email, user_id))

        connection.commit()

        return jsonify({'message': 'Usuario actualizado correctamente'}), 200

    except Exception as e:
        print("❌ Error al actualizar usuario:", e)
        return jsonify({'error': 'Error al actualizar usuario'}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

# =============== ADMIN - ELIMINAR USUARIOS =============
@app.route('/admin/usuarios/<int:user_id>', methods=['DELETE'])
def delete_usuario(user_id):
    connection = None
    cursor = None
    try:
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute("DELETE FROM users WHERE user_id = %s", (user_id,))
        connection.commit()

        return jsonify({'message': 'Usuario eliminado correctamente'})

    except Exception as e:
        print("❌ Error al eliminar usuario:", e)
        return jsonify({'error': 'Error al eliminar usuario'}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

# ======================= RUN APP =======================
if __name__ == '__main__':
    app.run(debug=True)
