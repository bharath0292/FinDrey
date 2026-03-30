FROM python:3.11.5-slim

ENV ENVIRONMENT=DEVELOPMENT
ENV API_AUTH_TOKEN=findrey
ENV MONGO_USERNAME=bharath0292
ENV MONGO_PASSWORD=Findrey@123

RUN mkdir /backend
WORKDIR /backend

COPY . .

RUN pip install --upgrade pip && \
    pip install -r requirements.txt

EXPOSE 8080

CMD uvicorn app.main:app --host 0.0.0.0 --port 8080