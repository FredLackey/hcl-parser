const _ = require('cleaner-node');

const toDataBlock = line => {

  if (line.trim().length === 0) {
    return null;
  }

  const parts = line.split('=').map(x => x.trim()).filter(x => x.length > 0);
  if (parts.length !== 3) {
    return null;
  }
  if (!parts[2].startsWith('<<') || parts[2] === '<<') {
    return null;
  }

  return {
    name: parts[0],
    key: parts[2].substring(2),
    lines: [line]
  }

}

module.exports = toDataBlock;

/**
 *   assume_role_policy = <<POLICY
{
  "Statement": [
    {
      "Action": [
        "sts:AssumeRoleWithSAML",
        "sts:TagSession"
      ],
      "Condition": {
        "StringEquals": {
          "SAML:aud": "https://signin.amazonaws-us-gov.com/saml"
        }
      },
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws-us-gov:iam::063455067217:saml-provider/AWSSSO_4541b2760ad72a0a_DO_NOT_DELETE"
      }
    }
  ],
  "Version": "2012-10-17"
}
POLICY
 */