# ใช้ Node.js 18 เป็น base image
FROM node:18

# ตั้ง working directory
WORKDIR /usr/src/app

# คัดลอก package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอก source code ทั้งหมด
COPY . .

# ระบุพอร์ต (ถ้ามีการใช้ express server)
EXPOSE 3000
# สั่งรันแอป
CMD ["npm", "start"]