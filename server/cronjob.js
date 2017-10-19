import sequelize from 'sequelize';
import { BorrowedBook, User } from './models';
import { borrowingDuration } from './helpers/borrowingLimits';
import { transporter, mailOptions } from './config/mail';

const Op = sequelize.Op;
const timeLimit = borrowingDuration * 1000 * 60 * 60 * 24;

const defaulters = () => {
  BorrowedBook.findAll({
    where: {
      returned: false,
      updatedAt: {
        [Op.lt]: new Date(new Date() - timeLimit)
      }
    },
    attributes: ['userId']
  })
    .then((borrowedBooks) => {
      const ids = borrowedBooks.map(book => book.userId);
      User.findAll({
        where: {
          id: { [Op.in]: ids }
        },
        attributes: ['email']
      })
        .then((users) => {
          const emails = users.map(user => user.email);
          const to = emails;
          const bcc = null;
          const subject = 'Defaut on Returning Book';
          const html = '<h3>Hello. This is to notify you that you have' +
           'exceeded the borrowing duration for one of our books and would' +
           'start getting billed for the book.</h3>';
          transporter.sendMail(mailOptions(to, bcc, subject, html));
        }, error => process.stdout.write(error.stack));
    }).catch((error) => {
      process.stdout.write(error.stack);
      process.exit(0);
    });
};

defaulters();
