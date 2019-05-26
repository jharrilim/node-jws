/**
 * ### [JOSE Header](http://self-issued.info/docs/draft-ietf-jose-json-web-signature.html#rfc.section.4)
 * 
 * For a JWS, the members of the JSON object(s) representing the JOSE Header describe the digital signature
 * or MAC applied to the JWS Protected Header and the JWS Payload and optionally additional properties of
 * the JWS. The Header Parameter names within the JOSE Header MUST be unique; JWS parsers MUST either reject
 * JWSs with duplicate Header Parameter names or use a JSON parser that returns only the lexically last
 * duplicate member name, as specified in Section 15.12 ("The JSON Object") of ECMAScript 5.1 
 * [ECMAScript](http://self-issued.info/docs/draft-ietf-jose-json-web-signature.html#ECMAScript).
 * 
 * Implementations are required to understand the specific Header Parameters defined by this specification
 * that are designated as "MUST be understood" and process them in the manner defined in this specification.
 * All other Header Parameters defined by this specification that are not so designated MUST be ignored when
 * not understood. Unless listed as a critical Header Parameter, per Section 4.1.11, all Header Parameters
 * not defined by this specification MUST be ignored when not understood.
 * 
 * There are three classes of Header Parameter names: Registered Header Parameter names, Public Header
 * Parameter names, and Private Header Parameter names.
 *
 * @export
 * @interface Header
 */
export interface Header {
    /**
     * ### Algorithm
     * 
     * The alg (algorithm) Header Parameter identifies the cryptographic algorithm used to secure the JWS. 
     * The JWS Signature value is not valid if the alg value does not represent a supported algorithm or 
     * if there is not a key for use with that algorithm associated with the party that digitally signed 
     * or MACed the content. alg values should either be registered in the IANA "JSON Web Signature and 
     * Encryption Algorithms" registry established by [JWA] or be a value that contains a 
     * Collision-Resistant Name. The alg value is a case-sensitive ASCII string containing a StringOrURI 
     * value. This Header Parameter MUST be present and MUST be understood and processed by implementations.
     * 
     * A list of defined alg values for this use can be found in the IANA "JSON Web Signature and Encryption
     * Algorithms" registry established by [JWA]; the initial contents of this registry are the values
     * defined in Section 3.1 of [JWA].
     * 
     * @type {string}
     * @memberof Header
     */
    alg: string;

    /**
     * ### JWK Set URL
     * 
     * The jku (JWK Set URL) Header Parameter is a URI [RFC3986] that refers to a resource for a set of
     * JSON-encoded public keys, one of which corresponds to the key used to digitally sign the JWS.
     * The keys MUST be encoded as a JWK Set [JWK]. The protocol used to acquire the resource MUST provide
     * integrity protection; an HTTP GET request to retrieve the JWK Set MUST use Transport Layer Security
     * (TLS) [RFC2818] [RFC5246]; and the identity of the server MUST be validated, as per Section 6 of RFC
     * 6125 [RFC6125]. Also, see Section 8 on TLS requirements. Use of this Header Parameter is OPTIONAL.
     * 
     * @type {string}
     * @memberof Header
     */
    jku?: string;

    /**
     * ### JSON Web Key
     * 
     * The jwk (JSON Web Key) Header Parameter is the public key that corresponds to the key used to 
     * digitally sign the JWS. This key is represented as a JSON Web Key [JWK]. Use of this Header Parameter
     * is OPTIONAL.
     * 
     * @type {string}
     * @memberof Header
     */
    jwk?: string;

    /**
     * ### Key ID
     * 
     * The kid (key ID) Header Parameter is a hint indicating which key was used to secure the JWS.
     * This parameter allows originators to explicitly signal a change of key to recipients. The structure
     * of the kid value is unspecified. Its value MUST be a case-sensitive string. Use of this Header
     * Parameter is OPTIONAL.
     * 
     * When used with a JWK, the kid value is used to match a JWK kid parameter value.
     * 
     * @type {string}
     * @memberof Header
     */
    kid?: string;

    /**
     *
     *
     * @type {string}
     * @memberof Header
     */
    x5u?: string;

    /**
     *
     *
     * @type {string}
     * @memberof Header
     */
    x5c?: string;

    /**
     *
     *
     * @type {string}
     * @memberof Header
     */
    x5t?: string;

    /**
     *
     *
     * @type {string}
     * @memberof Header
     */
    'x5t#S256'?: string;

    /**
     * ### Type
     * 
     * The typ (type) Header Parameter is used by JWS applications to declare the media type 
     * [IANA.MediaTypes](http://self-issued.info/docs/draft-ietf-jose-json-web-signature.html#IANA.MediaTypes)
     * of this complete JWS. This is intended for use by the application when more than
     * one kind of object could be present in an application data structure that can contain a JWS;
     * the application can use this value to disambiguate among the different kinds of objects that might
     * be present. It will typically not be used by applications when the kind of object is already known.
     * This parameter is ignored by JWS implementations; any processing of this parameter is performed by
     * the JWS application. Use of this Header Parameter is OPTIONAL.
     * 
     * Per RFC 2045 [RFC2045](http://self-issued.info/docs/draft-ietf-jose-json-web-signature.html#RFC2045),
     * all media type values, subtype values, and parameter names are case
     * insensitive. However, parameter values are case sensitive unless otherwise specified for the 
     * specific parameter.
     * 
     * To keep messages compact in common situations, it is RECOMMENDED that producers omit an 
     * "application/" prefix of a media type value in a typ Header Parameter when no other '/' appears 
     * in the media type value. A recipient using the media type value MUST treat it as if "application/"
     * were prepended to any typ value not containing a '/'. For instance, a typ value of example SHOULD
     * be used to represent the application/example media type, whereas the media type 
     * application/example;part="1/2" cannot be shortened to example;part="1/2".
     * 
     * The typ value JOSE can be used by applications to indicate that this object is a JWS or JWE using
     * the JWS Compact Serialization or the JWE Compact Serialization. The typ value JOSE+JSON can be usedby
     * applications to indicate that this object is a JWS or JWE using the JWS JSON Serialization or the 
     * JWE JSON Serialization. Other type values can also be used by applications.
     * 
     * @type {string}
     * @memberof Header
     */
    typ?: string;

    /**
     * ### Content Type
     * 
     * The cty (content type) Header Parameter is used by JWS applications to declare the media type
     * [IANA.MediaTypes](http://self-issued.info/docs/draft-ietf-jose-json-web-signature.html#IANA.MediaTypes) 
     * of the secured content (the payload). This is intended for use by the application when more than one 
     * kind of object could be present in the JWS Payload; the application can use this value to disambiguate
     * among the different kinds of objects that might be present. It will typically not be used by
     * applications when the kind of object is already known. This parameter is ignored by JWS implementations;
     * any processing of this parameter is performed by the JWS application. Use of this Header Parameter is
     * OPTIONAL.
     * 
     * Per RFC 2045 [RFC2045](http://self-issued.info/docs/draft-ietf-jose-json-web-signature.html#RFC2045),
     * all media type values, subtype values, and parameter names are case insensitive. However, parameter 
     * values are case sensitive unless otherwise specified for the specific parameter.
     * 
     * To keep messages compact in common situations, it is RECOMMENDED that producers omit an 
     * "application/" prefix of a media type value in a cty Header Parameter when no other '/' appears in the
     * media type value. A recipient using the media type value MUST treat it as if "application/" were
     * prepended to any cty value not containing a '/'. For instance, a cty value of example SHOULD be used
     * to represent the application/example media type, whereas the media type application/example;part="1/2"
     * cannot be shortened to example;part="1/2".
     * 
     * @type {string}
     * @memberof Header
     */
    cty?: string;

    /**
     * The crit (critical) Header Parameter indicates that extensions to this specification and/or 
     * [JWA](http://self-issued.info/docs/draft-ietf-jose-json-web-signature.html#JWA) 
     * are being used that MUST be understood and processed. Its value is an array listing the Header 
     * Parameter names present in the JOSE Header that use those extensions. If any of the listed extension 
     * Header Parameters are not understood and supported by the recipient, then the JWS is invalid. 
     * Producers MUST NOT include Header Parameter names defined by this specification or 
     * [JWA](http://self-issued.info/docs/draft-ietf-jose-json-web-signature.html#JWA)
     * for use with JWS, duplicate names, or names that do not occur as Header Parameter names within the 
     * JOSE Header in the crit list. Producers MUST NOT use the empty list [] as the crit value. Recipients
     * MAY consider the JWS to be invalid if the critical list contains any Header Parameter names defined
     * by this specification or 
     * [JWA](http://self-issued.info/docs/draft-ietf-jose-json-web-signature.html#JWA) 
     * for use with JWS or if any other constraints on its use are violated.
     * When used, this Header Parameter MUST be integrity protected; therefore, it MUST occur only within 
     * the JWS Protected Header. Use of this Header Parameter is OPTIONAL. This Header Parameter MUST be 
     * understood and processed by implementations.
     * 
     * An example use, along with a hypothetical exp (expiration time) field is:
     * 
     * ```json
     * 
     * {
     *   "alg": "ES256",
     *   "crit": ["exp"],
     *   "exp": 1363284000
     * }
     * 
     * ```
     * 
     * @type {string}
     * @memberof Header
     */
    crit?: string;
}
