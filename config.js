module.exports = {
    port: process.env.PORT || 3050,
    db: process.env.MSSQL || {server: 'localhost',
                              database: 'BDDistBHF_CF20',
                              user: 'sa',
                              password: '123',
                              port: 1433},
    SECRET_TOKEN:'8caeM5V+HGJgzIHdPy68eBdMLZ6H1TNYqAX0rgRLauvYO0Z9KG/fuNQVumsEbYrNi5wkKKKZArUpTks5s3SiUg'
}
