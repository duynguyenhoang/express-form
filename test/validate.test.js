var assert = require("assert"),
    form = require("../index"),
    validate = form.validate;

module.exports = {
  'validate : isDate': function() {
    // Skip validating empty values
    var request = { body: {} };
    form(validate("field").isDate())(request, {});
    assert.equal(request.form.errors.length, 0);

    // Failure.
    var request = { body: { field: "fail" }};
    form(validate("field").isDate())(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "field is not a date");

    // Failure w/ custom message.
    var request = { body: { field: "fail" }};
    form(validate("field").isDate("!!! %s !!!"))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Success
    var request = { body: { field: "01/29/2012" }};
    form(validate("field").isDate())(request, {});
    assert.equal(request.form.errors.length, 0);
  },

  'validate : isEmail': function() {
    // Skip validating empty values
    var request = { body: {} };
    form(validate("field").isEmail())(request, {});
    assert.equal(request.form.errors.length, 0);

    // Failure.
    var request = { body: { field: "fail" }};
    form(validate("field").isEmail())(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "field is not an email address");

    // Failure w/ custom message.
    var request = { body: { field: "fail" }};
    form(validate("field").isEmail("!!! %s !!!"))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Success
    var request = { body: { field: "me@dandean.com" }};
    form(validate("field").isEmail())(request, {});
    assert.equal(request.form.errors.length, 0);

    var validEmails = [
      "user@host.com",
      "user@host.info",
      "user@host.co.uk",
      "user+service@host.co.uk",
      "user-ok.yes+tag@host.k12.mi.us",
      "FirstNameLastName2000@hotmail.com",
      "FooBarEmail@foo.apartments"
    ];

    for (var i in validEmails) {
      var request = { body: { field: validEmails[i] }};
      form(validate("field").isEmail())(request, {});
      assert.equal(request.form.errors.length, 0, 'failed to validate email: ' + validEmails[i]);
    }

    var badEmails = [
      "dontvalidateme",
      "nope@",
      "someUser",
      "<script@host.com",
      "userawesome*@host.com",
      "userawesom@ok.com?&vl=1"
    ];

    for (var i in badEmails) {
      var request = { body: { field: badEmails[i] }};
      form(validate("field").isEmail())(request, {});
      assert.equal(request.form.errors.length, 1, 'should not validate email: ' + badEmails[i]);
    }

  },

  'validate : isUrl': function() {
    // Failure.
    var request = { body: { field: "fail" }};
    form(validate("field").isUrl())(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "field is not a URL");

    // Failure w/ custom message.
    var request = { body: { field: "fail" }};
    form(validate("field").isUrl("!!! %s !!!"))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Success
    var request = { body: { field: "http://www.google.com" }};
    form(validate("field").isUrl())(request, {});
    assert.equal(request.form.errors.length, 0);
  },

  'validate : isIP': function() {
    // Failure.
    var request = { body: { field: "fail" }};
    form(validate("field").isIP())(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "field is not an IP address");

    // Failure w/ custom message.
    var request = { body: { field: "fail" }};
    form(validate("field").isIP("!!! %s !!!"))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Success
    var request = { body: { field: "0.0.0.0" }};
    form(validate("field").isIP())(request, {});
    assert.equal(request.form.errors.length, 0);
  },

  'validate : isAlpha': function() {
    // Failure.
    var request = { body: { field: "123456" }};
    form(validate("field").isAlpha())(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "field contains non-letter characters");

    // Failure w/ custom message.
    var request = { body: { field: "123456" }};
    form(validate("field").isAlpha("!!! %s !!!"))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Success
    var request = { body: { field: "abcde" }};
    form(validate("field").isAlpha())(request, {});
    assert.equal(request.form.errors.length, 0);
  },

  'validate : isAlphanumeric': function() {
    // Failure.
    var request = { body: { field: "------" }};
    form(validate("field").isAlphanumeric())(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "field contains non alpha-numeric characters");

    // Failure w/ custom message.
    var request = { body: { field: "------" }};
    form(validate("field").isAlphanumeric("!!! %s !!!"))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Success
    var request = { body: { field: "abc123" }};
    form(validate("field").isAlphanumeric())(request, {});
    assert.equal(request.form.errors.length, 0);
  },

  'validate : isNumeric': function() {
    // Failure.
    var request = { body: { field: "------" }};
    form(validate("field").isNumeric())(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "field is not a number");

    // Failure w/ custom message.
    var request = { body: { field: "------" }};
    form(validate("field").isNumeric("!!! %s !!!"))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Success Int
    var request = { body: {
      integer: "123456",
      floating: "123456.45",
      negative: "-123456.45",
      positive: "+123456.45",
      padded: "000045.343"
    }};
    form(
      validate("integer").isNumeric(),
      validate("floating").isNumeric(),
      validate("negative").isNumeric(),
      validate("positive").isNumeric(),
      validate("padded").isNumeric()
    )(request, {});
    assert.equal(request.form.errors.length, 0);
  },

  'validate : isInt': function() {
    // Failure.
    var request = { body: { field: "------" }};
    form(validate("field").isInt())(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "field is not an integer");

    // Failure w/ custom message.
    var request = { body: { field: "------" }};
    form(validate("field").isInt("!!! %s !!!"))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Success
    var request = { body: { field: "50" }};
    form(validate("field").isInt())(request, {});
    assert.equal(request.form.errors.length, 0);
  },

  'validate : isLowercase': function() {
    // Failure.
    var request = { body: { field: "FAIL" }};
    form(validate("field").isLowercase())(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "field contains uppercase letters");

    // Failure w/ custom message.
    var request = { body: { field: "FAIL" }};
    form(validate("field").isInt("!!! %s !!!"))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Success
    var request = { body: { field: "win" }};
    form(validate("field").isLowercase())(request, {});
    assert.equal(request.form.errors.length, 0);
  },

  'validate : isUppercase': function() {
    // Failure.
    var request = { body: { field: "fail" }};
    form(validate("field").isUppercase())(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "field contains lowercase letters");

    // Failure w/ custom message.
    var request = { body: { field: "fail" }};
    form(validate("field").isUppercase("!!! %s !!!"))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Success
    var request = { body: { field: "WIN" }};
    form(validate("field").isUppercase())(request, {});
    assert.equal(request.form.errors.length, 0);
  },

  'validate : isFloat': function() {
    // Failure.
    var request = { body: { field: "5000" }};
    form(validate("field").isFloat())(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "field is not a decimal");

    // Failure w/ custom message.
    var request = { body: { field: "5000" }};
    form(validate("field").isFloat("!!! %s !!!"))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Success
    var request = { body: { field: "5000.00" }};
    form(validate("field").isFloat())(request, {});
    assert.equal(request.form.errors.length, 0);
  },

  'validate : notEmpty': function() {
    // Failure.
    var request = { body: { field: "  \t" }};
    form(validate("field").notEmpty())(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "field has no value or is only whitespace");

    // Failure w/ custom message.
    var request = { body: { field: "  \t" }};
    form(validate("field").notEmpty("!!! %s !!!"))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Success
    var request = { body: { field: "win" }};
    form(validate("field").notEmpty())(request, {});
    assert.equal(request.form.errors.length, 0);
  },

  'validate : equals': function() {
    // Failure.
    var request = { body: { field: "value" }};
    form(validate("field").equals("other"))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "field does not equal other");

    // Failure w/ custom message.
    var request = { body: { field: "value" }};
    form(validate("field").equals("other", "!!! %s !!!"))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Success
    var request = { body: { field: "value" }};
    form(validate("field").equals("value"))(request, {});
    assert.equal(request.form.errors.length, 0);


    // Failure
    var request = {
      body: {
        field1: "value1",
        field2: "value2"
      }
    };
    form(validate("field1").equals("field::field2"))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "field1 does not equal value2");

    // Success
    var request = {
      body: {
        field1: "value",
        field2: "value"
      }
    };
    form(validate("field1").equals("field::field2"))(request, {});
    assert.equal(request.form.errors.length, 0);

    // Failure with nested values
    var request = {
      body: {
        field1: { deep: "value1"},
        field2: { deeper: "value2"}
      }
    };
    form(validate("field1.deep").equals("field::field2[deeper]"))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "field1.deep does not equal value2");

    // Success with nested values
    var request = {
      body: {
        field1: { deep: "value"},
        field2: { deeper: "value"}
      }
    };
    form(validate("field1[deep]").equals("field::field2.deeper"))(request, {});
    assert.equal(request.form.errors.length, 0);
  },

  'validate : contains': function() {
    // Failure.
    var request = { body: { field: "value" }};
    form(validate("field").contains("other"))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "field does not contain required characters");

    // Failure w/ custom message.
    var request = { body: { field: "value" }};
    form(validate("field").contains("other", "!!! %s !!!"))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Success
    var request = { body: { field: "value" }};
    form(validate("field").contains("alu"))(request, {});
    assert.equal(request.form.errors.length, 0);
  },

  'validate : notContains': function() {
    // Failure.
    var request = { body: { field: "value" }};
    form(validate("field").notContains("alu"))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "field contains invalid characters");

    // Failure w/ custom message.
    var request = { body: { field: "value" }};
    form(validate("field").notContains("alu", "!!! %s !!!"))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Success
    var request = { body: { field: "value" }};
    form(validate("field").notContains("win"))(request, {});
    assert.equal(request.form.errors.length, 0);
  },

  'validate : regex/is': function() {
    // regex(/pattern/)
    // regex(/pattern/, "message")
    // regex("pattern")
    // regex("pattern", "modifiers")
    // regex("pattern", "message")
    // regex("pattern", "modifiers", "message")

    // Failure: RegExp with default args
    var request = { body: { field: "value" }};
    form(validate("field").regex(/^\d+$/))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "field has invalid characters");

    // Failure: RegExp with custom message.
    var request = { body: { field: "value" }};
    form(validate("field").regex(/^\d+$/, "!!! %s !!!"))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Failure: String with default args.
    var request = { body: { field: "value" }};
    form(validate("field").regex("^\d+$"))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "field has invalid characters");

    // Success: String with modifiers
    var request = { body: { field: "value" }};
    form(validate("field").regex("^VALUE$", "i"))(request, {});
    assert.equal(request.form.errors.length, 0);

    // Failure: String with custom message
    var request = { body: { field: "value" }};
    form(validate("field").regex("^\d+$", "!!! %s !!!"))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Failure: String with modifiers and custom message
    var request = { body: { field: "value" }};
    form(validate("field").regex("^\d+$", "i", "!!! %s !!!"))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");


    // Success
    var request = { body: { field: "value" }};
    form(validate("field").regex(/^value$/))(request, {});
    assert.equal(request.form.errors.length, 0);
  },

  'validate : notRegex/not': function() {
    // notRegex(/pattern/)
    // notRegex(/pattern/, "message")
    // notRegex("pattern")
    // notRegex("pattern", "modifiers")
    // notRegex("pattern", "message")
    // notRegex("pattern", "modifiers", "message")

    // Failure: RegExp with default args
    var request = { body: { field: "value" }};
    form(validate("field").notRegex(/^value$/))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "field has invalid characters");

    // Failure: RegExp with custom message.
    var request = { body: { field: "value" }};
    form(validate("field").notRegex(/^value$/, "!!! %s !!!"))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Failure: String with default args.
    var request = { body: { field: "value" }};
    form(validate("field").notRegex("^value$"))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "field has invalid characters");

    // Success: String with modifiers
    var request = { body: { field: "value" }};
    form(validate("field").notRegex("^win$", "i"))(request, {});
    assert.equal(request.form.errors.length, 0);

    // Failure: String with custom message
    var request = { body: { field: "value" }};
    form(validate("field").notRegex("^value$", "!!! %s !!!"))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Failure: String with modifiers and custom message
    var request = { body: { field: "value" }};
    form(validate("field").notRegex("^value$", "i", "!!! %s !!!"))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Success
    var request = { body: { field: "value" }};
    form(validate("field").notRegex(/^win$/))(request, {});
    assert.equal(request.form.errors.length, 0);
  },

  'validation : minLength': function() {
    // Failure.
    var request = { body: { field: "value" }};
    form(validate("field").minLength(10))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "field is too short");

    // Failure w/ custom message.
    var request = { body: { field: "value" }};
    form(validate("field").minLength(10, "!!! %s !!!"))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Success
    var request = { body: { field: "value" }};
    form(validate("field").minLength(1))(request, {});
    assert.equal(request.form.errors.length, 0);
  },

  'validation : isString()': function() {
    var request = { body: { username: 'adasds@example.com', password: { 'somevalue': '1' } }};
    form(validate('password', 'Password')
      .required()
      .isString()
      .minLength(10, '%s must be a minimum of 10 characters')
      .maxLength(256, '%s must be a maximum of 256 characters'))(request, {});
    assert.ok(!request.form.isValid);
    assert.strictEqual(request.form.errors[0], 'Password is not a string');
  },

  'validation : maxLength': function() {
    // Failure.
    var request = { body: { field: "value" }};
    form(validate("field").maxLength(1))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "field is too long");

    // Failure w/ custom message.
    var request = { body: { field: "value" }};
    form(validate("field").maxLength(1, "!!! %s !!!"))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Success
    var request = { body: { field: "value" }};
    form(validate("field").maxLength(5))(request, {});
    assert.equal(request.form.errors.length, 0);
  },

  'validation : required': function() {
    // Failure.
    var request = { body: {} };
    form(validate("field").required())(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "field is required");

    // Failure w/ placeholder value and custom message.
    var request = { body: { field: "value" }};
    form(validate("field").required("value", "!!! %s !!!"))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Success
    var request = { body: { field: "5000.00" }};
    form(validate("field").required())(request, {});
    assert.equal(request.form.errors.length, 0);

    // Non-required fields with no value should not trigger errors
    // Success
    var request = { body: {
      fieldEmpty: "",
      fieldUndefined: undefined,
      fieldNull: null
    }};
    form(
      validate("fieldEmpty").is(/whatever/),
      validate("fieldUndefined").is(/whatever/),
      validate("fieldNull").is(/whatever/),
      validate("fieldMissing").is(/whatever/)
    )(request, {});
    assert.equal(request.form.errors.length, 0);
  },

  'validation : custom': function() {
    var request;

    // Failure.
    request = { body: { field: "value" }};
    form(validate("field").custom(function(value) {
      throw new Error();
    }))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "field is invalid");

    // Failure w/ custom message.
    request = { body: { field: "value" }};
    form(validate("field").custom(function(value) {
      throw new Error();
    }, "!!! %s !!!"))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Failure w/ custom message from internal error.
    request = { body: { field: "value" }};
    form(validate("field").custom(function(value) {
      throw new Error("Radical %s");
    }))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "Radical field");

    // Success
    request = { body: { field: "value" }};
    form(validate("field").custom(function(value) {}))(request, {});
    assert.equal(request.form.errors.length, 0);

    // Pass form data as 2nd argument to custom validators
    request = { body: { field1: "value1", field2: "value2" }};
    form(validate("field1").custom(function(value, formData) {
      assert.equal("value1", value);
      assert.ok(formData);
      assert.equal("value1", formData.field1);
      assert.equal("value2", formData.field2);
      throw new Error("This is a custom error thrown for %s.");
    }))(request, {});
    assert.equal(request.form.errors.length, 1);
  },

  "validation: custom : async": function(done) {
    var request = { body: { field1: "value1", field2: "value2" }};
    var next = function next() {
      assert.strictEqual(request.form.isValid, false);
      assert.strictEqual(request.form.errors.length, 1);
      assert.strictEqual(request.form.errors[0], 'Invalid field1');
      done();
    };

    form(validate("field1").custom(function(value, source, callback) {
      process.nextTick(function() {
        assert.strictEqual(value, 'value1');
        callback(new Error("Invalid %s"));
      });
    }))(request, {}, next);
  },

  "validation : custom : async : success": function(done) {
    var request = { body: { field1: "value1", field2: "value2" }};
    var callbackCalled = false;
    var next = function next() {
      assert.strictEqual(callbackCalled, true);
      assert.strictEqual(request.form.isValid, true);
      assert.strictEqual(request.form.errors.length, 0);
      done();
    };
    form(validate("field1").custom(function(value, source, callback) {
      process.nextTick(function() {
        assert.strictEqual(value, 'value1');
        callbackCalled = true;
        callback(null);
      });
    }))(request, {}, next);
  },

  "validation : custom : async : chaining": function(done) {
    var request = { body: { field1: "value1", field2: "value2" }};
    var callbackCalled = 0;
    var next = function next() {
      assert.strictEqual(callbackCalled, 2);
      assert.strictEqual(request.form.isValid, false);
      assert.strictEqual(request.form.errors.length, 2);
      assert.strictEqual(request.form.errors[0], 'Fail! field1');
      assert.strictEqual(request.form.errors[1], 'yes sync custom funcs still work !! field1');
      done();
    };

    form(validate("field1")
      .custom(function(value, source, callback) {
        process.nextTick(function() {
          ++callbackCalled;
          callback(null);
        });
      })
      .custom(function(value, source, callback) {
        process.nextTick(function() {
          ++callbackCalled;
          callback(new Error('Fail! %s'));
        });
      })
      .custom(function(value, source) {
        throw new Error('yes sync custom funcs still work !! %s');
      })
    )(request, {}, next);
  },

  "validation : custom : async : multiple fields": function(done) {
    var request = { body: { field1: "value1", field2: "value2" }};
    var callbackCalled = 0;
    var next = function next() {
      assert.strictEqual(callbackCalled, 2);
      assert.strictEqual(request.form.isValid, false);
      assert.strictEqual(request.form.errors.length, 2);
      assert.strictEqual(request.form.errors[0], 'field1 error');
      assert.strictEqual(request.form.errors[1], 'field2 error');
      done();
    };
    form(
      validate("field1").custom(function(value, source, callback) {
        process.nextTick(function() {
          ++callbackCalled;
          assert.strictEqual(value, 'value1')
          callback(new Error('%s error'));
        });
      }),
      validate("field2").custom(function(value, source, callback) {
        process.nextTick(function() {
          ++callbackCalled;
          assert.strictEqual(value, 'value2');
          callback(new Error('%s error'));
        });
      })
    )(request, {}, next);
  },

  "validation : request.form property-pollution": function() {
    var request = { body: { }};
    form()(request, {});
    assert.equal(request.form.errors.length, 0);
    assert.equal('{}', JSON.stringify(request.form));
  },

  "validation : complex properties": function() {
    var request = { body: { field: { inner: "value", even: { more: { inner: "value" }}}}};
    form(
      validate("field[inner]").required().equals("value"),
      validate("field[inner]").required().equals("fail"),
      validate("field[even][more][inner]").required().equals("value"),
      validate("field[even][more][inner]").required().equals("fail")
    )(request, {});
    assert.equal(request.form.errors.length, 2);
  },

  'validation : arrLength : failed default message': function() {
    var request = { body: { field: "value" }};
    form(validate("field").arrLength(10, 20))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "field is too short");

    request = { body: { field: "value is so long so it is failed" }};
    form(validate("field").arrLength(4, 20))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "field is too long");

    request = { body: { field: "value is so long so it is failed" }};
    form(validate("field").arrLength(10, 20, []))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "field is too long");
  },

  'validation : arrLength : failed custom message': function() {
    var request = { body: { field: "value" }};
    form(validate("field").arrLength(10, 20, ["!!! %s SO SHORT!!!", "!!! %s SO LONG!!!"]))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field SO SHORT!!!");

    request = { body: { field: "value is so long so it is failed" }};
    form(validate("field").arrLength(10, 20, ["!!! %s SO SHORT!!!", "!!! %s SO LONG!!!"]))(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field SO LONG!!!");
  },

  'validation : arrLength : success': function() {
    var request = { body: { field: "value" }};
    form(validate("field").arrLength(1, 5))(request, {});
    assert.equal(request.form.errors.length, 0);

    request = { body: { field: "value" }};
    form(validate("field").arrLength(1, 15, ["short", "long"]))(request, {});
    assert.equal(request.form.errors.length, 0);

    request = { body: { field: "" }};
    form(validate("field").arrLength(0, 15, ["short", "long"]))(request, {});
    assert.equal(request.form.errors.length, 0);
  },

  "field : validateErrorsAlways : custom handler w/ error on an empty non-required field" : function() {
    var request = {
      body: {
        field1: "5",
        field2: ""
      }
    };
    var helpers = {
      customHelperWithError: function(data, source){
        if(source.field1 === "5" && data === "") {
          throw new Error('fail');
        }
      }
    };
    form(
        validate("field2").custom(helpers.customHelperWithError).alwaysValidateErrors()
    )(request, {});
    assert.equal(request.form.isValid, false);
    assert.equal(request.form.errors.length, 1);
  }
};
