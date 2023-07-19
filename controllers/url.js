//const { Request, Response } = require('express');
const { getIpLocation } = require('../utils');
const Url = require('../models/url');
const Visit = require('../models/visit');
const IP = require('ip');

exports.redirectUrl = async (req, res) => {
    try {
      const url = await Url.findOne({
        urlSlug: new RegExp(`^${req.params.urlSlug}$`, 'i'),
      });
  
      if (url) {
        const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const userAgent = req.headers['user-agent'];
        const referer = req.headers.referer || 'Unknown';
        const ipLocation = await getIpLocation(ipAddress);
  
        const newVisit = new Visit({
          url: url._id,
          ipAddress,
          userAgent,
          referer,
          country: ipLocation.country || 'Unknown',
          countryCode: ipLocation.country_code || 'Unknown',
          city: ipLocation.city || 'Unknown',
          continent: ipLocation.continent || 'Unknown',
          latitude: ipLocation.latitude || 'Unknown',
          longitude: ipLocation.longitude || 'Unknown',
        });
  
        await newVisit.save();
  
        // Increment the clickCount for the corresponding URL
        await Url.findByIdAndUpdate(url._id, { $inc: { clickCount: 1 } });
  
        res.redirect(url.originalUrl);
      } else {
        res.redirect('/error');
      }
    } catch (err) {
      console.error(err);
      res.redirect('/error');
    }
  };
  


exports.createUrl = async (req, res) => {
    let { originalUrl, urlSlug } = req.body;
    try {
        let payload = {};

        //search for url in db
        const url = await Url.findOne({
            urlSlug: new RegExp(`^${urlSlug}$`, 'i'),
        });

        if (url) {
            return res.status(400).json({
                success: false,
                message: 'Url Slug already exists',
            });
        }

        // if user is authenticated, save the url to the user

        if (req.params.logged_user_id) {
            payload = {
                originalUrl,
                urlSlug,
                user: req.params.logged_user_id,
            };
        } else {
            payload = {
                originalUrl,
                urlSlug,
            };
        }
        const newUrl = new Url(payload);

        await newUrl.save();

        res.status(200).json({
            success: true,
            message: 'Url created',
            originalUrl: newUrl.originalUrl,
            urlSlug: newUrl.urlSlug,
        });
    } catch (err) {
        // console.log(err);
        res.status(500).json({ success: false, message: 'An error occurred' });
    }
};

exports.getUrls = async (req, res) => {
    try {
        if (req.params.logged_user_id == req.params.id) {
            const urls = await Url.find({ user: req.params.logged_user_id }).sort({ createdAt: -1 });

            // Add clickCount to each URL in the response
            const urlsWithClickCount = urls.map(url => {
                return Object.assign({}, url._doc, {
                    clickCount: url.clickCount,
                });
            });

            res.json(urlsWithClickCount);
        } else {
            res.status(401).json({ error: 'Unauthorized' });
        }
    } catch (err) {
        // console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
};



exports.checkSlug = async (req, res) => {
    try {
        // const url = await Url.findOne({ urlSlug: req.params.urlSlug });
        const url = await Url.findOne({
            urlSlug: new RegExp(`^${req.params.urlSlug}$`, 'i'),
        });
        if (url) {
            res.json({ success: false });
        } else {
            res.json({ success: true });
        }
    } catch (err) {
        // console.log(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
