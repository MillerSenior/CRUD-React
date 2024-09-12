const db = require('./db'); // Adjust the path as needed

const checkImagesTable = async () => {
    try {
        // Query to check if the `images` table exists
        const checkTableQuery = `
            SELECT * 
            FROM information_schema.tables 
            WHERE table_schema = ? 
            AND table_name = 'images';
        `;
        const tables = await db.query(checkTableQuery, [process.env.DB_NAME]);

        if (tables.length > 0) {
            console.log('The `images` table exists.');

            // Query to check the columns in the `images` table
            const checkColumnsQuery = `
                SELECT COLUMN_NAME 
                FROM information_schema.columns 
                WHERE table_schema = ? 
                AND table_name = 'images';
            `;
            const columns = await db.query(checkColumnsQuery, [process.env.DB_NAME]);

            if (columns.length > 0) {
                console.log('Columns in the `images` table:');
                columns.forEach(column => console.log(column.COLUMN_NAME));
            } else {
                console.log('No columns found in the `images` table.');
            }
        } else {
            console.log('The `images` table does not exist.');
        }
    } catch (error) {
        console.error('Error checking the `images` table:', error);
    }
};

checkImagesTable();
