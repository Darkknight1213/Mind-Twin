import psycopg2
conn = psycopg2.connect("postgresql://neondb_owner:npg_O1nMBtU7RAiL@ep-still-firefly-adq70ny0-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require")
print("Connected!")
